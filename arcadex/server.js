import app from './src/app.js';

const port = 80;

app.get("/", (req, res) => {
    res.json({ mensagem: "Servidor rodando para fazer os multiplayers" });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});