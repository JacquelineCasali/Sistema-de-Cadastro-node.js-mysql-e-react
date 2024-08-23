'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Repositorios,{
        foreignKey:'userId',
        through:'Users_Repositorios',
           as:'repositorio',
      onUpdate:'CASCADE',
      onDelete:'CASCADE'})

  
    }
    }



    
  
  Users.init({
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        notEmpty:{
          msg:"Esse campo não pode ser vazio"
        },
      }  
  },
    
    
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
     isEmail:{
          msg:"Esse campo precisa ser um e-mail"
         }
      },
      unique:true,
    },



    password:{
    type:DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: {
        msg:"Esse campo não pode ser vazio"
      },
    }
    } ,


    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      
      validate:{
        notEmpty:{
          msg:"Esse campo precissa ser um telefone valido"
        },
            }, 
      unique:true, 
  },


  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};