while [[ true ]]; do rm gif.gif; ln -sf $(find . -type f -name "*.gif"|shuf -n1 ) gif.gif; readlink gif.gif; sleep 5; done
