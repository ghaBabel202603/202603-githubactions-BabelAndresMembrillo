# Set the base image to use for subsequent instructions
FROM alpine:3.19

# Set the working directory inside the container
WORKDIR /tmp

# Copy any source file(s) required for the action
COPY entrypoint.sh .

# add exec. permissions
RUN ["chmod", "+x", "/tmp/entrypoint.sh"]

# Configure the container to be run as an executable
ENTRYPOINT ["/tmp/entrypoint.sh"]
