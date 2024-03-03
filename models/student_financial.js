const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_financial', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      },
     
    
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true
      },
    
  
       total_amount: {
      type: DataTypes.STRING(255),
			 allowNull: true
      },
       paid_amount: {
      type: DataTypes.STRING(255),
			 allowNull: true
      },
     
       payment_type: {
      type: DataTypes.ENUM("monthly", "quartly","halfyearly","yearly"),
			 allowNull: true
      },
       transaction_date: {
      type: DataTypes.DATE,
      allowNull: true,
     

      },
       transaction_status: {
      type: DataTypes.ENUM("paid", "notPaid"),
			 allowNull: true
      },
        transaction_mode: {
      type: DataTypes.ENUM("cash", "online"),
			 allowNull: true
      },
        
         online_mode_name: {
     type: DataTypes.STRING(255),
			 allowNull: true
     

      },
      
         Status: {
      type: DataTypes.ENUM("active", "inactive"),
			 defaultValue: "active"
      },
       
   
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')

    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'student_financial',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
