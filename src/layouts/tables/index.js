import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { createTheme, styled } from '@mui/material';

import CreateRecord from './CreateRecord';
import UpdateRecord from './UpdateRecord';
import DeleteRecord from './DeleteRecord';


const app = express();
const PORT = 2999;

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conexão com o MongoDB estabelecida');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

const produtoSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  email: String,
});

const Produto = mongoose.model('Clients', produtoSchema);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:2999', credentials: true }));


const TableWrapper = styled(Card)({
  margin: '8px',
  display: 'flex',
  flexDirection: 'column',
});

const TableHeader = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '16px',
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const TableRowHeader = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  padding: '16px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TableBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const TableRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TableHeaderCell = styled('div')({
  fontWeight: 'bold',
});

// Define the Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    action: {
      hover: '#f3f3f3',
    },
  },
});

const Tables = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      app.get('/api/records', async (req, res) => {
        try {
          const response = await Produto.find({});
          res.setHeader('Content-Type', 'application/json'); // Definindo o Content-Type para JSON
          res.json(response);
          console.log(response.data)
          setAuthors(response.data);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao buscar registros' });
        }
      })
    };
    fetchData();
  }, []); 



  const handleRecordCreated = (newRecord) => {
    setAuthors([...authors, newRecord]);
  };

  const handleRecordUpdated = (recordId, updatedRecord) => {
    setAuthors(authors.map((record) => (record._id === recordId ? updatedRecord : record)));
  };

  const handleRecordDeleted = (recordId) => {
    setAuthors(authors.filter((record) => record._id !== recordId));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TableWrapper>
        <TableHeader>
          <TableRowHeader>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Idade</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </TableRowHeader>
        </TableHeader>
        <TableBody>
  {authors.map((author) => (
    <TableRow key={author._id}>
      <div>{author.nome}</div>
      <div>{author.idade}</div>
      <div>{author.email}</div>
      <div>
      <UpdateRecord
  recordId={author._id}
  initialData={{
    name: author.nome,
    age: author.idade ? author.idade.toString() : '', // Verifica se author.idade é definido
    email: author.email,
  }}
  onUpdate={handleRecordUpdated}
/>
        <DeleteRecord
          recordId={author._id}
          onDelete={() => handleRecordDeleted(author._id)}
        />
      </div>
    </TableRow>
  ))}
</TableBody>
      </TableWrapper>
      <div>
        <CreateRecord onRecordCreated={handleRecordCreated} />
      </div>
      <Footer />
    </DashboardLayout>
    // Tonnel
  );
};

export default Tables;






