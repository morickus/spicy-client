import { useSendCode } from '@/features/auth/model/useSendCode';
import { useVerifyCode } from '@/features/auth/model/useVerifyCode';
import GoogleAuth from '@/shared/ui/GoogleAuth';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type FieldType = {
  email: string;
  code?: string;
};

const SignInForm = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { sendCode, isPendingSendCode, isSuccessSendCode } = useSendCode();
  const { sendVerifyCode, isPendingVerifyCode, isSuccessVerifyCode } = useVerifyCode();

  useEffect(() => {
    if (isSuccessVerifyCode) {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/');
    }
  }, [isSuccessVerifyCode]);

  return (
    <Form
      form={form}
      onFinish={isSuccessSendCode ? sendVerifyCode : sendCode}
      layout="vertical"
      requiredMark={false}
    >
      <ContainerForm>
        <Form.Item<FieldType>
          label="Enter your email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Incorrect email!' },
          ]}
        >
          <Input
            size="large"
            placeholder="E-mail"
            disabled={isPendingSendCode || isSuccessSendCode}
          />
        </Form.Item>
        {isSuccessSendCode && (
          <Form.Item<FieldType>
            label="Specify 6 characters from the email"
            name="code"
            rules={[
              { required: true, message: 'Please input your code!' },
              { len: 6, message: 'Code must be 6 characters' },
            ]}
          >
            <Input.OTP
              size="large"
              style={{ width: '100%' }}
              disabled={isPendingVerifyCode}
              formatter={(str) => str.toUpperCase()}
              onChange={(v) => v.length == 6 && form.submit()}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isPendingSendCode || isPendingVerifyCode}
            block
          >
            {isSuccessSendCode ? 'Verify code' : 'Login'}
          </Button>
        </Form.Item>
        <Divider />
        <GoogleAuth />
      </ContainerForm>
    </Form>
  );
};

const ContainerForm = styled.div`
  gap: 15px;
  display: flex;
  padding: 30px 0;
  flex-direction: column;
`;

export default SignInForm;
