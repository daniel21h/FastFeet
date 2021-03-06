import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, withRouter, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import Input from '../../components/Input';

import {
  Container,
  Content,
  TitleContainer,
  ButtonsContainer,
  BackButton,
  SaveButton,
  BoxContainer,
  InputContainer,
} from './styles';

interface Courier {
  name: string;
  id: number;
}

interface Recipient {
  name: string;
  id: number;
  addinfos: string;
}

interface Request {
  addinfos: string;
}

const HandleRecipient: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [title, setTitle] = useState('Novo destinatário');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function loadRecipients(): Promise<void> {
      const response = await api.get(`/recipients/${id}`);

      if (formRef.current) {
        formRef.current.setData({
          name: response.data.name,
          street: response.data.street,
          zipcode: response.data.zipcode,
          state: response.data.state,
          city: response.data.city,
          addinfos: response.data.addinfos ? response.data.addinfos : ' ',
          number: response.data.number,
        });
      }
    }

    if (id) {
      setTitle('Edição de destinatário');
    }

    loadRecipients();
  }, [id]);

  const handleSubmit = useCallback(
    async (data) => {
      if (formRef.current) {
        if (id) {
          await api.put(`recipients/${id}`, data);
        } else {
          if (data.addinfos === '') {
            data.addinfos = ' ';
          }
          await api.post('recipients', data);
        }

        history.push('/recipients');
      }
    },
    [history, id],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TitleContainer>
              <h1>{title}</h1>
              <ButtonsContainer>
                <Link to="/recipients">
                  <BackButton>
                    <MdKeyboardArrowLeft size={20} />
                    VOLTAR
                  </BackButton>
                </Link>
                <SaveButton type="submit">
                  <MdDone size={20} />
                  SALVAR
                </SaveButton>
              </ButtonsContainer>
            </TitleContainer>

            <BoxContainer>
              <InputContainer>
                <p>Nome</p>
                <Input name="name" placeholder="Nome do destinatário" />
              </InputContainer>
              <InputContainer>
                <p>Rua</p>
                <Input name="street" placeholder="Rua do endereço" />
              </InputContainer>
              <InputContainer>
                <p>Número</p>
                <Input name="number" placeholder="Número do endereço" />
              </InputContainer>
              <InputContainer>
                <p>Complemento</p>
                <Input name="addinfos" placeholder="Complemento do endereço" />
              </InputContainer>
              <InputContainer>
                <p>Cidade</p>
                <Input name="city" placeholder="Cidade do endereço" />
              </InputContainer>
              <InputContainer>
                <p>Estado</p>
                <Input name="state" placeholder="Estado do endereço" />
              </InputContainer>
              <InputContainer>
                <p>Cep</p>
                <Input name="zipcode" placeholder="CEP do endereço" />
              </InputContainer>
            </BoxContainer>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default withRouter(HandleRecipient);
