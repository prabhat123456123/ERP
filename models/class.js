module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
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
    track_school_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     class_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      annual_fee: {
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
    tableName: 'class',
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
  return Class;
};
