module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('certificate', {
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
      
        track_class_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
    
         track_school_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
      slug: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
    
  certificate_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
   certificate_Desc: {
      type: DataTypes.STRING(500),
      allowNull: true
      },
  
    
      certificate_photo: {
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
    tableName: 'certificate',
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
  return Certificate;
};