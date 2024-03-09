module.exports = (sequelize, DataTypes) => {
  const Holiday = sequelize.define('holiday', {
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
    year: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
     month: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      event_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,

    },
     end_date: {
      type: DataTypes.DATE,
      allowNull: true,

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
    tableName: 'holiday',
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
  return Holiday;
};
