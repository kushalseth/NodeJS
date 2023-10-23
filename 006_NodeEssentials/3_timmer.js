const finish = () => {
  process.stdout.write("Finished");
  clearInterval(timeInterval);
};

setTimeout(finish, 5000);

const waitTime = 1000;
let currentTime = 0;

function incTime() {
  currentTime += waitTime;
  process.stdout.write(`${(currentTime / 1000).toString()} \n`);
}

const timeInterval = setInterval(incTime, waitTime);
