console.log("What is your name?");

// stdin
process.stdin.on("data", (data) => {
  // processing on each data event
  const name = data.toString().trim().toUpperCase();
  if (name !== "") {
    // stdout
    process.stdout.write(`Hello ${name}!`);
  } else {
    // stderr
    process.stderr.write("Input was empty.\n");
  }
});