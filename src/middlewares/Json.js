export async function json(req, res) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }
    
    const requestBody = Buffer.concat(buffers).toString();

    if (requestBody) {
        try {
            req.body = JSON.parse(requestBody);
        } catch (error) {
            console.error('Erro ao analisar o JSON:', error);
            req.body = null;
        }
    } else {
        req.body = null;
    }

    res.setHeader('Content-Type', 'application/json')
}


