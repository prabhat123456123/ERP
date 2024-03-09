module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('school', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      },
      track_id: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      role: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
    
  school_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
  principal_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      principal_email: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      principal_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      year_establish: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      
        address: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
       number_of_class: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
     logo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
      payment_status: {
      type: DataTypes.ENUM("paid", "notPaid"),
			 defaultValue: "notPaid"
      },
    Status: {
      type: DataTypes.ENUM("active", "inactive"),
			 defaultValue: "active"
      },
    payment_mode: {
       type: DataTypes.ENUM("cash", "online"),
      allowNull: true
      },
       online_mode_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
       latitude: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
        longitude: {
      type: DataTypes.STRING(100),
      allowNull: true
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
    tableName: 'school',
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
  return School;
};
