module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('exam', {
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
      slug: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
      exam_name: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
    track_school_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
     track_class_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },
      track_subject_id: {
      type: DataTypes.STRING(255),
      allowNull: true
      },

   
    Status: {
      type: DataTypes.ENUM("active", "inactive"),
			 defaultValue: "active"
      },
    exam_status: {
       type: DataTypes.ENUM("new", "resumed","completed"),
			 defaultValue: "new"
      },
    exam_mode: {
      type: DataTypes.ENUM("practice", "online","quiz"),
			 allowNull: true
      },
    exam_type: {
    type: DataTypes.ENUM("subjective", "objective"),
			 allowNull: true
      },
    exam_level: {
     type: DataTypes.ENUM("easy", "medium","hard"),
      allowNull: true
      },
     start_date: {
      type: DataTypes.DATE,
      allowNull: true
      },
      end_date: {
      type: DataTypes.DATE,
      allowNull: true
      },
       total_marks: {
      type: DataTypes.STRING(100),
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
    tableName: 'exam',
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
  return Exam;
};
