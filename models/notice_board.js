module.exports = (sequelize, DataTypes) => {
  const Noticeboard = sequelize.define('notice_board', {
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
    track_school_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     title: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
      image: {
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
    tableName: 'notice_board',
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
  return Noticeboard;
};
