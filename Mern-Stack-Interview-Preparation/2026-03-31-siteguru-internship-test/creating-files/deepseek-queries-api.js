require('dotenv').config();

async function queryDeepSeek() {
    try {
        console.log('Sending request to DeepSeek API...');
        
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: 'Hello! How are you?' }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        // Check if the response is OK
        if (!response.ok) {
            console.error('HTTP Error:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error details:', errorText);
            return;
        }

        const data = await response.json();
        
        // Log the full response to debug
        console.log('Full API Response:', JSON.stringify(data, null, 2));
        
        // Check if choices exists and has content
        if (data.choices && data.choices[0] && data.choices[0].message) {
            console.log('\n✅ Response:', data.choices[0].message.content);
        } else {
            console.error('\n❌ Unexpected response structure:', data);
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

queryDeepSeek();