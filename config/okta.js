const okta = require('@okta/okta-sdk-nodejs');

const oktaClient = new okta.Client({
    orgUrl: process.env.ORG_OKTA_URL,
    token: '66b34497731f6a5ddf18bb77'
});

// Example of Okta user management
app.post('/register', async (req, res) => {
    try {
        const newUser = {
            profile: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                login: 'john.doe@example.com'
            },
            credentials: {
                password: {
                    value: 'password'
                }
            }
        };
        const user = await oktaClient.createUser(newUser);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});