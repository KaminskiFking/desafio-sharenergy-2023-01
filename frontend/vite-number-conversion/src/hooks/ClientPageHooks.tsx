import { useState } from 'react';

const ClientPageHooks = () => {
  const [customers, setCustomers]: any = useState([]);

  const addCustomer = (customer: any) => {
    setCustomers([...customers, customer]);
  }

  const updateCustomer = (id: any, updatedCustomer: any) => {
    setCustomers(customers.map((customer: any) => 
      customer.id === id ? updatedCustomer : customer
    ));
  }

  const deleteCustomer = (id: any) => {
    setCustomers(customers.filter((customer: any) => customer.id !== id));
  }

  return { customers, addCustomer, updateCustomer, deleteCustomer };
}

export default ClientPageHooks;
