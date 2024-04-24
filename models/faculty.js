module.exports = (sequelize, DataTypes) => {
  const Faculty = sequelize.define('faculty', {
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
    
    track_school_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
    
  name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
  mothers_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      fathers_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      email: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      dob: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
       phone: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
        address: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
       gender: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
       experience: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
       qualification: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
       specialize: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
        salery: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
     photo: {
      type: DataTypes.STRING(100),
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
    tableName: 'faculty',
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
  return Faculty;
};
