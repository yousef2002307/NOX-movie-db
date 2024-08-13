import React from "react";
import axios from "axios";
import Nav from "./Nav";
import { useState,useEffect } from "react";
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
  import { checkLogin,checkIfEmailExcist } from "../functions/Func";
  const Register = () => {
    const [data, setData] = useState([]);
    let navigate = useNavigate();
    const toast = useToast(); // Create toast instance for feedback
  
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    });
  


    const submitform = (values, actions) => {
      // Handle form submission (e.g., send data to server)
    const {email,password} = values;
    let doesEmailExcist = false; 
     checkIfEmailExcist(email).then(val=>{
     doesEmailExcist = val
    }).then(() => {

   
  
    if(doesEmailExcist === true){
      toast({
        title: 'Registration did not submitted',
        description: `Your registration not completed due the email already excist in the database,please use another email. `,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error inserting data: ');
     return null;
    }
      setData(values); // Placeholder for actual submission logic
      let key = "data" + Math.floor(Math.random() * 10000);
      localStorage.setItem(`${key}`, JSON.stringify(values));
     //add it to local server
     const postData = async () => {
      try {
   let  response = await axios.post('http://localhost:3001/users',{email,password});
     console.log('Data inserted successfully:', response.data);
  } catch (error) {
    toast({
      title: 'Registration did not submitted',
      description: `Your registration not completed due to server error. ${error}`,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    console.error('Error inserting data: ', error);
  }
};

postData();
      actions.setSubmitting(false);
      toast({
        title: 'Registration submitted',
        description: 'Your registration is done know you will redirect for login.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    })
    };

    useEffect(() => {
      if (checkLogin()) {
        navigate('/');
      }
    }, []);
     
    return (
      <>
      <Nav/>
      <section className="register">
      <Text fontSize='6xl'>Register Form</Text>
        <Formik
          initialValues={{name:'', email: '', password: '', confirmPassword: '' }}
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
                
<Field name='name'>
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.name && form.touched.name}>
      <FormLabel htmlFor='name'>Name</FormLabel>
      <Input {...field} placeholder='Enter your name' />
      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
    </FormControl>
  )}
</Field>
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
  
              <Field name='confirmPassword' type='password'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                  >
                    <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                    <Input {...field} type="password" placeholder='Confirm your password' />
                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
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

export default Register;
