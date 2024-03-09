module.exports = (sequelize, DataTypes) => {
  const Studentfinancial =  sequelize.define('student_financial', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      },
      track_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
    track_student_id: {
      type: DataTypes.STRING(255),
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
      defaultValue: sequelize.fn('current_timestamp')

    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
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
  return Studentfinancial;
};
