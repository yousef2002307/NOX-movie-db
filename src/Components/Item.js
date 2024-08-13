import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
 
  Input,
  Button
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { checkUserCred , checkLogin} from "../functions/Func";
const Item = (props) => {
  let navigate = useNavigate();
  const toast = useToast(); // Create toast instance for feedback

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
   
  });




  
  
  const submitform = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
  
    try {
      const isValidUser = await checkUserCred(values.email, values.password);
      if (isValidUser) {
        localStorage.setItem("is_logged", true);
        toast({
          title: 'Login submitted',
          description: 'Your login is done. You will be redirected to home.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      } else {
        toast({
          title: 'Error',
          description: 'Wrong credentials.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };
  
    useEffect(() => {
      if(checkLogin()){
        navigate('/');
      }
    },[]);
   
  return (
    <>
    <Nav/>
    <section className="register">
    <Text fontSize='5xl'>loginForm</Text>
      <Formik
        initialValues={{email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={submitform}
        //   // Handle form submission (e.g., send data to server)
        //   console.log(values); // Placeholder for actual submission logic
        //   actions.setSubmitting(false);
        //   toast({
        //     title: 'Registration submitted',
        //     description: 'Your registration details have been submitted for processing.',
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //   });
        // }}
      >
        {(props) => (
          <Form>
              

            <Field name='email'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input {...field} type='email' placeholder='Enter your email' />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='password' type='password'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input {...field} type="password" placeholder='Enter your password' />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>


            <Button mt={4} colorScheme='teal' type='submit' disabled={props.isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      </section>
    </>
  );

  };
  
  export default React.memo(Item);