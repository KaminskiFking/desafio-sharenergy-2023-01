import { Request, Response } from "express";
import ClientService from "../services/clientService";
import { TClient } from "../types/types";

export const ClientController = async(req: Request, res: Response) => {

  const {name, email, telephone, address, cpf } = req.body as TClient;
  const { status, message } = await ClientService.clientService({ name, email, telephone, address, cpf });
  if(message) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(message);
}

export const ClientUpdateController = async(req: Request, res: Response) => {
  const { id } = req.params;
  const client = req.body as TClient;
  const { status, message } = await ClientService.clientUpdateService(id, client);
  if(message) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(message);
}

export const ClientFindAllController = async(_req: Request, res: Response) => {
  const { status, message } = await ClientService.clientFindAllService();
  if(message) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(message);
}

export const ClientDeleteController = async(req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await ClientService.clientDeleteService({_id: id});
  if(message) {
    return res.status(status).json({ message });
  }
  return res.status(status).json(message);
}
