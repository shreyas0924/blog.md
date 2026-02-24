---
title: "Stateful vs Stateless Backends"
date: "2024-11-30"
published: true
description: In software architecture, stateful and stateless terms describe how applications manage user sessions and data across multiple requests. Each approach has its unique characteristics, advantages, and use cases. 
tags: ['backend', 'node.js']
---


### **Understanding Stateful and Stateless Backends**

In software architecture, **stateful** and **stateless terms** describe how applications manage user sessions and data across multiple requests. Each approach has its unique characteristics, advantages, and use cases.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F2d25d726-98ce-428e-be14-f058144a6e26%2FUntitled.png?table=block&id=e62fb27e-c3e4-49e0-98c1-7f5c13809b3f&cache=v2 )

### Stateless Server

A **stateless backend** treats each client request as an independent transaction, without retaining any information from previous requests. Each request must contain all the necessary information for the server to process it. This design simplifies scalability since any server can handle any request without needing to know the client's history.

Advantages of stateless server:

* No need for stickiness - Users can connect to any server at any point in time. They need not maintain a connection to a specific server. This makes **load balancing** straightforward.
    
* Easy Autoscaling - Stateless servers can easily be scaled up and down based on CPU usage. Users can be routed to other servers if the resources are fully utilized.
    
* Commonly used in RESTful API’s and microservices.
    

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F3d3c5158-2215-4497-aaed-e2df262bf5b2%2FUntitled.png?table=block&id=c5699fa0-5857-42ee-be5b-3842224eec51&cache=v2 )

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your_secret_key';

app.post('/login', (req, res) => {
    const user = { id: 1, name: 'John Doe' }; // Simulated user data
    const token = jwt.sign(user, SECRET_KEY); // Generate token
    res.json({ token });
});

app.get('/profile', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        res.send(`Welcome back, ${user.name}`); // Access user info from token
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

### Stateful Server

A **stateful server** maintains information about a client's session across multiple requests. This means that the server remembers previous interactions and can provide contextually relevant responses based on that history. For example, in an e-commerce application, a shopping cart can retain items added by a user as they navigate through different pages.

Examples

* In memory cache
    
* Realtime game state
    
* Chat Application
    

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2Fa79defac-2d25-47d6-ae5c-374f55ba9488%2FUntitled.png?table=block&id=c74df5e0-e663-4bca-b034-e749202e891a&cache=v2 )

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map(); // To store client sessions

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Assign a unique ID to the client
    const clientId = Date.now();
    clients.set(clientId, ws);

    ws.on('message', (message) => {
        console.log(`Received message from client ${clientId}: ${message}`);
        
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log(`Client ${clientId} disconnected`);
        clients.delete(clientId); // Remove client from the map on disconnect
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
```

Understanding the differences between stateful and stateless backends is essential for designing scalable and efficient systems. Stateless servers offer simplicity and ease of scaling, while stateful servers are necessary for applications that require in-memory state management, such as real-time games and chat applications. Stickiness is a crucial concept for stateful servers to ensure that users are connected to the correct server holding their state.