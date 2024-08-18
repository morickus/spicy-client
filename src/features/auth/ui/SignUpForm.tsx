import { useSignUp } from '@/features/auth/model/useSignUp';
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

const SignUpForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { signUp, isPendingSignUp, isSuccessSignUp } = useSignUp();
  const { sendVerifyCode, isPendingVerifyCode, isSuccessVerifyCode } = useVerifyCode();

  useEffect(() => {
    if (isSuccessVerifyCode) {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/');
    }
  }, [isSuccessVerifyCode]);

  return (
    <Form
      onFinish={isSuccessSignUp ? sendVerifyCode : signUp}
      layout="vertical"
      requiredMark={false}
    >
      <ContainerForm>
        <Form.Item<FieldType>
          label="Enter your email for confirmation"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Incorrect email!' },
          ]}
        >
          <Input size="large" placeholder="E-mail" disabled={isPendingSignUp || isSuccessSignUp} />
        </Form.Item>
        {/*<Form.Item name="agreement" valuePropName="checked">*/}
        {/*  <Checkbox>*/}
        {/*    I agree with the <Link href={'/'}>rules of use of the service</Link>*/}
        {/*  </Checkbox>*/}
        {/*</Form.Item>*/}
        {isSuccessSignUp && (
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
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isPendingSignUp || isPendingVerifyCode}
            block
          >
            {isSuccessSignUp ? 'Complete registration' : 'Send confirmation'}
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

export default SignUpForm;
