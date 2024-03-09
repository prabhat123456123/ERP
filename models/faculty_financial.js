module.exports = (sequelize, DataTypes) => {
  const Facultyfinancial = sequelize.define('faculty_financial', {
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
    
    track_faculty_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
    
  
       total_salery: {
      type: DataTypes.STRING(255),
			 allowNull: true
      },
       remaining_salery: {
      type: DataTypes.STRING(255),
			 allowNull: true
      },
       given_salery: {
      type: DataTypes.STRING(255),
			 allowNull: true
      },
       given_date: {
      type: DataTypes.DATE,
      allowNull: true,
     

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
    tableName: 'faculty_financial',
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
  return Facultyfinancial;
};
