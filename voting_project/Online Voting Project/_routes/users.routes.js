const usersController = require("../controller/users.controller");
var express = require("express");
const { route } = require("express/lib/application");
var router = express.Router();

//user Registration
router.post("/register", usersController.register);
/**
 * @swagger
 * /users/register:
 *   post:
 *      description: User Registration ( Here user will register his/her details like firstname, lastname, emailid and password. These details will be stored in users table.)
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: User
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - firstName
 *                 - lastName
 *                 - emailId
 *                 - password
 *                 
 *              properties:
 *                  firstName:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      
 *                  lastName:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                     
 *                  emailId:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                     
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 * 
 *                 
 *                     
 *      responses:
 *          '200':
 *              description: Registered successfully
 *          '400':
 *              description: Enter the correct details
 *          
 */

//User Login
router.post("/login", usersController.login);
/**
 * @swagger
 * /users/login:
 *   post:
 *      description: User Login (After Registration, user can login with his/her credentials (emailid and password))
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: User
 *            description: User login
 *            schema:
 *              type: object
 *              required:
 *                 - emailId
 *                 - password
 *                
 *              properties:
 *                  emailId:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                     
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 * 
 *                 
 *      responses:
 *          '200':
 *              description: Login successfully
 *          '400':
 *              description: Invalid Credentials
 *         
 */


//Adding Query
router.post("/addquery", usersController.addquery);

/**

 * @swagger

 * /query/addquery:

 *   post:

 *      description: Adding query (When admin logs in  he/she will be directed to another page where they can add the query).

 *      tags:

 *          - query

 *      parameters:

 *          - in: body

 *            name: query

 *            description: query data

 *            schema:

 *              type: object

 *              required:

 *                 - queryName

 *                 - queryStartDate

 *                 - queryEndDate

 *            properties:

 *                  queryName:

 *                      type: string

 *                      minLength: 1

 *                      maxLength: 45

 *                  queryStartDate:

 *                      type: integer

 *                  queryEndDate:

 *                      type:integer

 *                    

 *      responses:

 *          '200':

 *              description: Query Added Successfully

 *          '400':

 *              description: Kindly add the query

 *          

 */
//Adding Options

router.post("/addoptions", usersController.addoptions);


/**
 * @swagger
 * /options/addoptions:
 *   post:
 *      description: Options Data (The admin can add the options for respective query)
 *      tags:
 *          - options
 *      parameters:
 *          - in: body
 *            name: options
 *            description: Options data
 *            schema:
 *              type: array
 *              required:
 *                 - optionId
 *                 - queryId
 *                 - options
 *                
 *                
 *                 
 *              properties:
 *                  optionId:
 *                      type: integer
 * 
 *                  queryId:
 *                      type: integer
 *                      
 *                      
 *                  options:
 *                      type: string
 *                      
 *                     
 *      responses:
 *          '200':
 *              description: Options Added successfully
 *          '400':
 *              description: Kindly add the options
 *          
 */

 //voting
router.post("/castvote", usersController.castvote);
/**
 * @swagger
 * /vote/castvote:
 *   post:
 *      description: casting vote (The users can cast a vote for the query posted/added by admin)
 *      tags:
 *          - vote
 *      parameters:
 *          - in: body
 *            name: vote
 *            description: Voting data
 *            schema:
 *              type: opject
 *              required:
 *                
 *                 - queryId
 *                 - optionId
 *                 - userId
 *                
 *              properties:
 *                 
 *                  queryId:
 *                      type: integer
 *                      
 *                      
 *                  optionId:
 *                      type: integer
 *                  
 *                  userId:
 *                      type: integer
 *                      
 *                     
 *      responses:
 *          '200':
 *              description: Voted casted successfully
 *          '400':
 *              description: Casting Unsuccessfull
 *          
 */





  router.get("/getAllUsers", usersController.getAllUsers);

  /**
 
   * @swagger
 
   * /details/getAllUsers:
 
   *   get:
 
   *      description: To get user details.
 
   *      tags:
 
   *          - details
 
   *          
 
   *      responses:
 
   *          '200':
 
   *              description: successfull
 
   *          '400':
 
   *              description: Bad Request
 
   *          
 
   */



   router.post("/getAlloptions", usersController.getAlloptions);

  /**
 
   * @swagger
 
   * /details/getAlloptions:
 
   *   get:
 
   *      description: To Get Options Details
 
   *      tags:
 
   *          - details
 
   *          
 
   *      responses:
 
   *          '200':
 
   *              description: successfull
 
   *          '400':
 
   *              description: Bad Request
 
   *          
 
   */


  // get  All query
   router.get("/getAllquery", usersController.getAllquery);
   
   /**
  
    * @swagger
  
    * /details/getAllquery:
  
    *   get:
  
    *      description: To Get Query Details
  
    *      tags:
  
    *          - details
  
    *          
  
    *      responses:
  
    *          '200':
  
    *              description: successfull
  
    *          '400':
  
    *              description: Bad Request
  
    *          
  
    */


   // get  All query
   router.get("/getFilteredQuery", usersController.getFilteredQuery);
   
   /**
  
    * @swagger
  
    * /details/getFilteredQuery
    *   get:
  
    *      description: To Get Query Details
  
    *      tags:
  
    *          - details
  
    *          
  
    *      responses:
  
    *          '200':
  
    *              description: successfull
  
    *          '400':
  
    *              description: Bad Request
  
    *          
  
    */




    // get Id list(queryId and optionId)
    router.post("/getIdlist", usersController.getIdlist);

    /**
   
     * @swagger
   
     * /details/getIdlist:
   
     *   post:
   
     *      description:  To list  Id Details
   
     *      tags:
   
     *          - details
   
     *          
   
     *      responses:
   
     *          '200':
   
     *              description: successfull
   
     *          '400':
   
     *              description: Bad Request
   
     *          
   
     */
 
  
   router.get("/gettotalvotes", usersController.gettotalvotes);

   /**
  
    * @swagger
  
    * /vote/gettotalvotes:
  
    *   get:
  
    *      description: To get total number of  votes.
  
    *      tags:
  
    *          -  total vote
  
    *          
  
    *      responses:
  
    *          '200':
  
    *              description: successfull
  
    *          '400':
  
    *              description: Bad Request
  
    *          
  
    */
    router.put("/updatepassword", usersController.updatepassword);

    
   /**
  
    * @swagger
  
    * /update/updatepassword:
  
    *   patch:
  
    *      description: Updating the password
  
    *      tags:
  
    *          -  update

    *      parameters:
 *          - in: body
 *            name: update
 *            description: updating password
 *            schema:
 *              type: opject
 *              required:
 *                
 *                 - emailId
 *                 - password
 *             
 *                
 *              properties:
 *                 
 *                  emailId:
 *                      type: string
 *                      
 *                      
 *                  password:
 *                      type: string
  
    *          
  
    *      responses:
  
    *          '200':
  
    *              description: updated successfull
  
    *          '400':
  
    *              description: Bad Request
  
    *          
  
    */
 
    router.delete("/deletequery", usersController.deletequery);

    /**
    
    * @swagger
    
    * /delete/deletequery:
    
    *   delete:
    
    *      description:  Deleting 
    
    *      tags:
    
    *          -  delete
    
    *      parameters:
    
    
    
    *          - in: body
    
    
    
    *            name: delete
    
    
    
    *            description: deleting query
    
    
    
    *            schema:
    
    
    
    *              type: object
    
    
    
    *              required:
    
    
    
    *                 - queryId
    
    
    
    *                              
    
    
    
    *              properties:
    
    
    
    *                  queryId:
    
    
    
    *                      type: integer
    
    
    
    *                
    
    
    
    *      responses:
    
    *          '200':
    
    *              description: deleted successfully
    
    *          '400':
    
    *              description: Bad Request
    
    *          
    
    */

     router.get("/gettotalvote", usersController.gettotalvote);

     /**
     
      * @swagger
     
      * /vote/gettotalvote:
     
      *   get:
     
      *      description: get total vote
     
      *      tags:
     
      *          - vote
     
      *          
     
      *      responses:
     
      *          '200':
     
      *              description: successfull
     
      *          '400':
     
      *              description: Bad request
     
      *          
     
      */

      router.post("/totalVote", usersController.totalVote);



      /**
      
      
      
       * @swagger
      
      
      
       * /vote/totalVote:
      
      
      
       *   post:
      
      
      
       *      description: posting totalvotes
      
      
      
       *      tags:
      
      
      
       *          - vote
      
      
      
       *      parameters:
      
      
      
       *          - in: body
      
      
      
       *            name: vote
      
      
      
       *            description: totalvotes data
      
      
      
       *            schema:
      
      
      
       *              type: object
      
      
      
       *              required:
      
      
      
       *                 - queryId              
      
       
      
       *              properties:
      
      
      
       *                  queryId:
      
      
      
       *                      type: integer
      
      
      
      
       *      responses:
      
      
      
       *          '200':
      
      
      
       *              description:  totalvotes posted successfully
      
      
      
       *          '400':
      
      
      
       *              description: error
      
      
      
       *          
      
      
      
       */

       router.post("/voteforsingleoption", usersController.voteforsingleoption);



       /**
       
       
       
        * @swagger
       
       
       
        * /vote/totalvoteforsingleoption:
       
       
       
        *   post:
       
       
       
        *      description: total vote for single option
       
       
       
        *      tags:
       
       
       
        *          - vote
       
       
       
        *      parameters:
       
       
       
        *          - in: body
       
       
       
        *            name: vote
       
       
       
        *            description: totalvotes data
       
       
       
        *            schema:
       
       
       
        *              type: object
       
       
       
        *              required:
       
       
       
        *                 - optionId              
       
        
       
        *              properties:
       
       
       
        *                  optionId:
       
       
       
        *                      type: integer
       
       
       
       
        *      responses:
       
       
       
        *          '200':
       
       
       
        *              description:  totalvoteforsingleoption
       
       
       
        *          '400':
       
       
       
        *              description: error
       
       
       
        *          
       
       
       
        */

        router.delete("/deletequery", usersController.deletequery);

        /**
        
        * @swagger
        
        * /delete/deletequery:
        
        *   delete:
        
        *      description:  Deleting 
        
        *      tags:
        
        *          -  delete
        
        *      parameters:
        
        
        
        *          - in: body
        
        
        
        *            name: delete
        
        
        
        *            description: deleting query
        
        
        
        *            schema:
        
        
        
        *              type: object
        
        
        
        *              required:
        
        
        
        *                 - queryId
        
        
        
        *                              
        
        
        
        *              properties:
        
        
        
        *                  queryId:
        
        
        
        *                      type: integer
        
        
        
        *                
        
        
        
        *      responses:
        
        *          '200':
        
        *              description: deleted successfully
        
        *          '400':
        
        *              description: Bad Request
        
        *          
        
        */
    
  

   
 
module.exports = router;
