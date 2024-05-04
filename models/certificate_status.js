

module.exports = (sequelize, DataTypes) => {
  const Certificatestatus = sequelize.define('certificate_status', {
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
    track_certificate_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     track_student_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     
    status: {
      type: DataTypes.ENUM("active", "inactive"),
			 defaultValue: "active"
      },
    
      created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: sequelize.fn('current_timestamp')
          
        },
        created_by: {
          type: DataTypes.STRING(100),
          allowNull: true
      },
     updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  
  }, {
    sequelize,
    tableName: 'certificate_status',
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
  return Certificatestatus;
};
