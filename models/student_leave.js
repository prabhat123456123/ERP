module.exports = (sequelize, DataTypes) => {
  const Studentleave = sequelize.define('student_leave', {
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
      reason: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      description: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
    
    
    
  from_date: {
      type: DataTypes.DATE,
      allowNull: true
      },
  to_date: {
      type: DataTypes.DATE,
      allowNull: true
      },
      leave_status: {
      type: DataTypes.ENUM("Approved", "Rejected","Pending"),
      allowNull: true
      },
     
     
    Status: {
      type: DataTypes.ENUM("active", "inactive"),
			 defaultValue: "active"
      },
    leave_type: {
      type: DataTypes.ENUM("fullday", "halfday"),
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
    tableName: 'student_leave',
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
  return Studentleave;
};
