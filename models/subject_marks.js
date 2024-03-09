module.exports = (sequelize, DataTypes) => {
   const Subjectmarks = sequelize.define('subject_marks', {
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
    track_subject_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     total_marks: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      obtained_marks: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      passing_marks: {
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
    tableName: 'subject_marks',
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
  return Subjectmarks;
};
