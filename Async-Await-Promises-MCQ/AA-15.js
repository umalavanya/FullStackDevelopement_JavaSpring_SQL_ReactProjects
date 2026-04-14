// Approach 1
async function sequential() {
    const a = await fetch('/api/1');
    const b = await fetch('/api/2');
    const c = await fetch('/api/3');
    return [a, b, c];
}

// Approach 2
async function parallel() {
    const [a, b, c] = await Promise.all([
        fetch('/api/1'),
        fetch('/api/2'),
        fetch('/api/3')
    ]);
    return [a, b, c];
}

// Which approach is faster?