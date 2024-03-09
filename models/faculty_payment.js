module.exports = (sequelize, DataTypes) => {
  const Facultypayment = sequelize.define('faculty_payment', {
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
      transaction_amount: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
  transaction_date: {
      type: DataTypes.DATE,
      allowNull: true
      },
  transaction_data: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      transaction_status: {
      type: DataTypes.ENUM("success", "failure"),
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
    tableName: 'faculty_payment',
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
  return Facultypayment;
};

