'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate:{
          notEmpty:{
            msg:"Esse campo não pode ser vazio"
          },
        }  
    },
    
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate:{
          // nao permite campo vazio
          isEmail:{
            msg:"Esse campo precisa ser um e-mail"
           }
         }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notEmpty:{
            msg:"Esse campo não pode ser vazio"
          },
        }  
    },
    telefone: {
      type: Sequelize.STRING,
     
      unique:true,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:"Esse campo precissa ser um telefone valido"
        },
      }  
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};