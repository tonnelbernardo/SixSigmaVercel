const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 2999;

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://mongol:sixsigma123@sixsigmacluster.jgaedll.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const produtoSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  email: String,
});

const Produto = mongoose.model('Clients', produtoSchema);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Rota para criar um novo produto
app.post('/records', async (req, res) => {
    try {
      const { name, age, email } = req.body;
  
      const novoProduto = new Produto({
        nome: name,
        idade: parseInt(age),
        email: email,
      });
  
      const produtoSalvo = await novoProduto.save();
      res.json(produtoSalvo);
    } catch (error) {
      console.error(error); // Adicionamos esta linha para imprimir o erro no console
      res.status(500).json({ error: 'Erro ao criar Cliente' });
    }
  });

  app.put('/records/:id', async (req, res) => {
    try {
      const { name, age, email } = req.body;
      const updatedRecord = { nome: name, idade: parseInt(age), email };
  
      const produtoAtualizado = await Produto.findByIdAndUpdate(
        req.params.id,
        updatedRecord,
        { new: true } // Para retornar o documento atualizado
      );
  
      if (!produtoAtualizado) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }
  
      res.json(produtoAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
  });



  app.delete('/records/:id', async (req, res) => {
    try {
      const produtoDeletado = await Produto.findByIdAndDelete(req.params.id);
  
      if (!produtoDeletado) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }
  
      res.json(produtoDeletado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar registro' });
    }
  });
  
  app.get('/records', async (req, res) => {
    try {
      const registros = await Produto.find({});
      res.json(registros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros' });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
