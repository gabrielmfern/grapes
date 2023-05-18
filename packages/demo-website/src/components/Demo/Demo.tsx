import { Component, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

import { FoxPox } from 'foxpox';

import { BarcodeScanner, CreditCard } from 'foxpox/Icons';

import { Form, FormStore } from 'foxpox/Form';
import Validators from 'foxpox/Form/Validators';
import { Input, Select, ButtonChooser } from 'foxpox/Form/Fields';
import { Box, Button } from 'foxpox/General';
import { Typography, Title } from 'foxpox/General/Typography';
import { Stack, Container, Divisor } from 'foxpox/Layout';
import { Row, Col } from 'foxpox/Layout/Grid';
import { Steps, Step } from 'foxpox/Navigation';

export type AddressFormValue = Partial<{
  cidade: string;
  rua: string;
  uf: string;
  numero: number;
  cep: string;
  bairro: string;
}>;

export type PaymentFormValue = Partial<{
  paymentMethod: 'cartao-de-credito' | 'boleto' | 'pix';
  creditCardDetails?: {
    number: string;
    cvv: string;
    displayedName: string;
    expiresIn: Date;
  };
}>;

const Demo: Component = () => {
  const [currentStep, setCurrentStep] = createSignal<number>(0);

  const addressFormStore = createStore<FormStore<AddressFormValue>>(new FormStore({}));
  const paymentFormStore = createStore<FormStore<PaymentFormValue>>(new FormStore({}));
  const [paymentForm, _setPaymentForm] = paymentFormStore;

  return (<FoxPox defaultThemeId='dark'>
    <Container
      maxWidth='md'
      style={{ height: '100vh' }}
      horizontalAlign='center'
      verticalAlign='center'
    >
      <Box
        style={{
          width: '100%',
          'max-width': '768px',
        }}
      >
        <Steps 
          current={currentStep} 
          identification='PassoAPassoDeCompra' 
          style={{ 
            "padding-right": "60px",
            "margin-top": "0"
          }}
        >
          <Step description='endereço de entrega'>endereço</Step>
          <Step description='dados de pagamento'>pagamento</Step>
          <Step description='confirme a compra'>conclusão</Step>
        </Steps>

        <Divisor/>

        {currentStep() === 0
          && <Form formStore={addressFormStore} indentification='EnderecoDeEntrega'>
            <Row>
              <Col size={16}>
                <Input
                  name='cidade'
                  label='Cidade'
                  placeholder='São Paulo'
                  validators={[Validators.required]}
                />
              </Col>
              <Col size={8}>
                <Select
                  name='uf'
                  label='UF'
                  validators={[Validators.required]}
                >
                  <Select.Option value='pe'>PE</Select.Option>
                  <Select.Option value='mg'>MG</Select.Option>
                  <Select.Option value='pr'>PR</Select.Option>
                  <Select.Option value='rj'>RJ</Select.Option>
                  <Select.Option value='sp'>SP</Select.Option>
                </Select>
              </Col>

              <Col size={16}>
                <Input
                  name='rua'
                  label='Rua'
                  validators={[Validators.required]}
                />
              </Col>
              <Col size={8}>
                <Input
                  type='number'
                  name='numero'
                  placeholder='513'
                  label='N°'
                  validators={[Validators.required]}
                />
              </Col>

              <Col size={16}>
                <Input
                  name='bairro'
                  label='Bairro'
                  placeholder='Butantã Morumbi'
                  validators={[Validators.required]}
                />
              </Col>
              <Col size={8}>
                <Input
                  name='cep'
                  placeholder='99999-999'
                  label='CEP'
                  validators={[Validators.required]}
                />
              </Col>
            </Row>
          </Form>}
        {currentStep() === 1
          && <Form formStore={paymentFormStore} indentification='DadosDePagamento'>
            <ButtonChooser
              name='paymentMethod'
              label='Método de pagamento'
              validators={[Validators.required]}
            >
              <ButtonChooser.Option value='cartao-de-credito'>
                <CreditCard /> Cartão de crédito
              </ButtonChooser.Option>
              <ButtonChooser.Option value='boleto'>
                <BarcodeScanner /> Boleto
              </ButtonChooser.Option>
              <ButtonChooser.Option value='pix'>
                Pix
              </ButtonChooser.Option>
            </ButtonChooser>

            {paymentForm.values.paymentMethod === 'cartao-de-credito' && <Box>
              <Typography>
                <Title type={4}>Dados do cartão de crédito</Title>
              </Typography>

              <Form.Inner
                identification='CreditCardDetails'
                name='creditCardDetails'
              >
                <Row>
                  <Col size={14}>
                    <Input
                      name='number'
                      label='número do cartão'
                      placeholder='0000 0000 0000 0000'
                      type='number'
                      validators={[Validators.required]}
                    />
                  </Col>

                  <Col size={10}>
                    <Input
                      name='cvv'
                      label='cvv'
                      placeholder='123'
                      type='number'
                      validators={[Validators.required]}
                    />
                  </Col>
                </Row>
              </Form.Inner>
            </Box>}
          </Form>}
        {currentStep() === 2
          && <h1>conclusão</h1>}

        <Stack direction='horizontal' align='space-between'>
          <Button
            size='medium'
            style={{
              "border-radius": '7px',
            }}
            onClick={() => setCurrentStep(currentStep() - 1)}
            disabled={currentStep() === 0}
          >Previous</Button>
          <Button
            size='medium'
            style={{
              "border-radius": '7px',
            }}
            onClick={() => setCurrentStep(currentStep() + 1)}
            disabled={currentStep() === 2}
          >Next</Button>
        </Stack>
      </Box>
    </Container>
  </FoxPox>);
};

export default Demo;
