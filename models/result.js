module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('result', {
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
  
      track_exam_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
      obtained_marks: {
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
    tableName: 'result',
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
  return Result;
};
