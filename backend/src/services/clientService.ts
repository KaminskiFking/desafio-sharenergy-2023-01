import { TClient } from '../types/types';
import { Client } from '../models/ClientModel';

const clientService = async (client: TClient) => {
  const {name, email, telephone, address, cpf } = client;

  const clientEmail = await Client.findOne({ email });

  if(clientEmail) {
  return {status: 400, message: 'Email Existente' };
  }
  const clientCpf = await Client.findOne({cpf})
  if(clientCpf) {
    return {status: 400, message: 'Cpf existente' };
  };

  const clientCreate = await Client.create({name, email, telephone, address, cpf});
  return {status: 200, message: clientCreate}
};

const clientUpdateService = async (id: any, client: TClient) => {
  const { name, email, telephone, address, cpf } = client;
  await Client.findByIdAndUpdate(id, {name, email, telephone, address, cpf});
  const clientUpdate = await Client.findById(id);
  return {status: 200, message: clientUpdate}
};

const clientFindAllService = async () => {
  const allClient = await Client.find();
  return {status: 200, message: allClient}
};

const clientDeleteService = async (_id: any) => {
  const clienteDelete = await Client.deleteOne({ _id });
  return {status: 200, message: clienteDelete}
};

export default {
  clientDeleteService,
  clientFindAllService,
  clientUpdateService,
  clientService,
};