const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faculty_attendance', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      },
     
    
    faculty_id: {
      type: DataTypes.INTEGER,
      allowNull: true
      },
    
  
       attendance_status: {
      type: DataTypes.ENUM("P", "A"),
			 defaultValue: "A"
      },
        Status: {
      type: DataTypes.ENUM("active", "inactive"),
			 defaultValue: "active"
      },
        check_in: {
      type: DataTypes.DATE,
      allowNull: true,
     

      },
        check_out: {
      type: DataTypes.DATE,
      allowNull: true,
    

    },
    latitude: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
     latitude: {
      type: DataTypes.STRING(100),
      allowNull: true
      },
   
     check_in_flag: {
      type: DataTypes.ENUM("0", "1"),
			 defaultValue: "0"
      },
      check_out_flag: {
      type: DataTypes.ENUM("0", "1"),
			 defaultValue: "0"
      },
   
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')

    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'faculty_attendance',
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
};
