const net = require('net');

const portsToCheck = [1433, 1434, 49701, 49702];

console.log('🔍 Checking SQL Server ports...');

portsToCheck.forEach(port => {
  const client = new net.Socket();
  
  client.setTimeout(2000);
  
  client.on('connect', () => {
    console.log(`✅ Port ${port} is OPEN and accepting connections`);
    client.destroy();
  });
  
  client.on('timeout', () => {
    console.log(`⏱️  Port ${port}: Connection timeout`);
    client.destroy();
  });
  
  client.on('error', (err) => {
    console.log(`❌ Port ${port}: ${err.code}`);
    client.destroy();
  });
  
  client.connect(port, 'localhost');
});