'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Contatos,{
        foreignKey:'clienteId',
        through:'cliente_contatos',
           as:'contato',
      onUpdate:'CASCADE',
      onDelete:'CASCADE'})

  
    }
    }



    
  
    Clientes.init({
      
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
    modelName: 'Clientes',
  });
  return Clientes;
};