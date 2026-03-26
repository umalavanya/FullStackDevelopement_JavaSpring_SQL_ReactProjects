// Sequential execution (takes 3 seconds)
async function sequential() {
    const result1 = await asyncTask1(); // 1 second
    const result2 = await asyncTask2(); // 1 second
    const result3 = await asyncTask3(); // 1 second
    return [result1, result2, result3];
}

// Parallel execution (takes 1 second)
async function parallel() {
    const promise1 = asyncTask1();
    const promise2 = asyncTask2();
    const promise3 = asyncTask3();
    
    const results = await Promise.all([promise1, promise2, promise3]);
    return results;
}

// Mixed: some parallel, some sequential
async function mixed() {
    const user = await getUser(); // Wait for user
    
    // Fetch posts and comments in parallel
    const [posts, comments] = await Promise.all([
        getPosts(user.id),
        getComments(user.id)
    ]);
    
    return { user, posts, comments };
}