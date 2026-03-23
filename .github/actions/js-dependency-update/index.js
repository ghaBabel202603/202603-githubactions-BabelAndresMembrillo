const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

async function run() {
    const baseBranch = core.getInput('base-branch');
    const targetBranch = core.getInput('target-branch');
    const workingDirectory = core.getInput('working-directory');
    const ghToken = core.getInput('gh-token');
    const debug = core.getBooleanInput('debug');

    const branchRegex = /^[a-zA-Z0-9_.\-\/]+$/;
    const dirRegex = /^[a-zA-Z0-9_\-\/]+$/;

    if (!branchRegex.test(baseBranch)) {
        core.setFailed('The base branch name is invalid.');
        return;
    }
    if (!branchRegex.test(targetBranch)) {
        core.setFailed('The target branch name is invalid.');
        return;
    }
    if (!dirRegex.test(workingDirectory)) {
        core.setFailed('The working directory path is invalid.');
        return;
    }

    core.info(`Base branch: ${baseBranch}`);
    core.info(`Target branch: ${targetBranch}`);
    core.info(`Working directory: ${workingDirectory}`);

    await exec.exec('npm', ['update'], { cwd: workingDirectory });

    let gitStatusOutput = await exec.getExecOutput('git', ['status', '-s', 'package*.json'], { cwd: workingDirectory });

    if (gitStatusOutput.stdout.length > 0) {
        core.info('There are updates available.');

        await exec.exec('git', ['checkout', '-b', targetBranch], { cwd: workingDirectory });
        await exec.exec('git', ['add', 'package.json', 'package-lock.json'], { cwd: workingDirectory });
        await exec.exec('git', ['commit', '-m', 'chore: update npm dependencies'], { cwd: workingDirectory });
        await exec.exec('git', ['push', '-u', 'origin', targetBranch], { cwd: workingDirectory });

        const octokit = github.getOctokit(ghToken);
        try {
            await octokit.rest.pulls.create({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                title: `Update NPM dependencies`,
                body: `This pull request updates NPM packages`,
                base: baseBranch,
                head: targetBranch
            });
        } catch (e) {
            core.error('[js-dependency-update] : Something went wrong while creating the PR. Check logs below.');
            core.setFailed(e.message);
            core.error(e);
        }
    } else {
        core.info('There are no updates at this point in time.');
    }
}

run();
