import {render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import AddRecord from "../AddRecord"
import GoogleSignin from "../GoogleSignin"
import History from "../History"
import Home from "../Home"
import UpdateRecord from "../UpdateRecord"

test('Render Test - Add Record Component',()=>{
render(<AddRecord></AddRecord>,{ wrapper: MemoryRouter});
   const element = screen.getByTestId("addrecord");
   expect(element).toBeInTheDocument();
});

test('Render Test - Google Signin Component',()=>{
   render(<GoogleSignin></GoogleSignin>,{ wrapper: MemoryRouter});
      const element = screen.getByTestId("googlesignin");
      expect(element).toBeInTheDocument();
   });

test('Render Test - History Component',()=>{
   render(<History></History>,{ wrapper: MemoryRouter});
      const element = screen.getByTestId("history");
      expect(element).toBeInTheDocument();
   });

test('Render Test - Home Component',()=>{
      render(<Home></Home>,{ wrapper: MemoryRouter});
         const element = screen.getByTestId("home");
         expect(element).toBeInTheDocument();
   });

test('Render Test - Update Record Component',()=>{
         render(<UpdateRecord></UpdateRecord>,{ wrapper: MemoryRouter});
            const element = screen.getByTestId("updaterecord");
            expect(element).toBeInTheDocument();
});


