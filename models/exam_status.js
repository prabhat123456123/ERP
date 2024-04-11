module.exports = (sequelize, DataTypes) => {
  const Examstatus = sequelize.define('exam_status', {
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
    track_exam_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     track_student_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
      correct_marks: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
      incorrect_marks: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
      obtained_marks: {
      type: DataTypes.STRING(255),
      allowNull: true
      },

   
    exam_status: {
      type: DataTypes.ENUM("new", "completed"),
			 allowNull: true
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
    tableName: 'exam_status',
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
  return Examstatus;
};
