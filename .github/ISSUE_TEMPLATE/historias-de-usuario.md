---
name: Historias de usuario
about: Historias de usuario por defecto usadas por el proyecto
title: Historias de usuario
labels: ''
assignees: ''

---

**As a** Data Owner
**I want to** Register Data User Manually
**So that** asure secure login and authentication 

### Scope
1. Create a form with the following fields:
- Name
- Last name
- Email 
- Password
2. Create endpoints for user registration
- Create a database
- Create a table **users** with the fields mentioned in the part 1.
- Create an endpont for creation
- Create the controller

### Out of scope
1. update, delete and other non-creation processes.
2. not including profile registration.
3. not including login.

### Acceptance Criteria
|  | AC                                          | GIVEN                                                                                         | WHEN                     | THEN                                                                                                                                 |
|---|---------------------------------------------|-----------------------------------------------------------------------------------------------|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
|  | Register an user successfully               | Data user fields are filled up correctly                                                      | press on register button | the information will be saved successfully                                                                                           |
|   | User registry fails for lack of data        | Some data user fields are missing                                                             | press on register button | an error message will appear and the data won't save successfully                                                                    |
|   | User name and last name incorrect format    | Name and lastname fields are incorrect format (for example: including numbers and/or symbols) | press on register button | an error message will appear and the data won't save successfully                                                                    |
|   | User name and last name incorrect dimension | Name and lastname fields are greather than 30 characters                                      | press on register button | an error message will appear and the data won't save successfully                                                                    |
|   | Length of a password is shorter than 8      | User password is shorter than 8 characters                                                    | press on register button | an error message indicating the incorrect longer will appear and the data won't save successfully                                    |
|   | Including a number and a symbol at least    | User password is not including numbers neither symbols                                        | press on register button | an error message indicating the incorrect because not including numbers and symbols will appear and the data won't save successfully |
|   | Email fails for incorrect format            | User email is not following the standart for email structure                                  | press on register        | an error message indicating the incorrect because not including correct format will appear and the data won't save successfully      |

### Definition of Done (DoD)
1. Acceptance Criteria all finished.
2. Deskcheck Ceremony.
3. Keep minimum test coverage of 80%
4. technical documentation published
