console.log('Before non-blocking operation');

// Non-blocking operation using setTimeout. This implements a delay of at least 2 seconds
setTimeout(() => {
  console.log('Non-blocking operation completed');
}, 3000); // Simulate a non-blocking operation that takes 3 seconds

console.log('After non-blocking operation');