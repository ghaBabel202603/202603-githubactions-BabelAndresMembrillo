#!/bin/sh

# Use INPUT_<INPUT_NAME> to get the value of an input
echo "Hello, $INPUT_NAME"

# Write outputs to the $GITHUB_OUTPUT file
echo "time=$(date)" >>"$GITHUB_OUTPUT"
