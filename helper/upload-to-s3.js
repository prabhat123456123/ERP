async function uploadImageToS3(imageFile, bucketName, userIdOrEmail, fileName) {


  // Specify the folder path within the bucket (replace 'images' with your desired folder name)


  const folderPath = userIdOrEmail + '/images/';
 
  // Specify the full key (path) for the image file in S3


  const key = folderPath + fileName;
 
  // Specify the parameters for S3 upload


  const params = {


	Bucket: bucketName,


	Key: key,


	Body: imageFile,


	ACL: 'public-read' // Optional: Set the ACL (Access Control List) to allow public read access


  };
 
  try {


	// Upload the image to S3


	const data = await s3.upload(params).promise();


	console.log('Image uploaded successfully:', data.Location);


	return data.Location; // Return the URL of the uploaded image


  } catch (error) {


	console.error('Error uploading image to S3:', error);


	throw error; // Throw an error if upload fails


  }


}
async function main() {


  const userId = 'user123'; // Replace with the actual user ID or email


  const imageFile = 'path/to/your/image.jpg'; // Path to the image file


  const bucketName = 'your-s3-bucket-name'; // Name of your S3 bucket


  const fileName = 'image.jpg'; // Name for the file in S3
 
  try {


	// Call the function to upload the image to S3


	const imageUrl = await uploadImageToS3(imageFile, bucketName, userId, fileName);


	console.log('Uploaded image URL:', imageUrl);


  } catch (error) {


	console.error('Error uploading image:', error);


  }


}
 
// Call the main function


main();
async function uploadImageToS3(imageFile, bucketName, userIdOrEmail, fileName) {


  // Specify the folder path within the bucket


  const folderPath = userIdOrEmail + '/images/';


  const key = folderPath + fileName;
 
  const params = {


	Bucket: bucketName,


	Key: key,


	Body: imageFile,


	ACL: 'public-read'


  };
 
  try {


	const data = await s3.upload(params).promise();


	console.log('Image uploaded successfully:', data.Location);


	// Delete the image file from the temporary folder after successful upload


	fs.unlink(imageFile, (error) => {


  	if (error) {


    	console.error('Error deleting image file:', error);


  	} else {


    	console.log('Image file deleted from temporary folder:', imageFile);


  	}


	});


	return data.Location;


  } catch (error) {


	console.error('Error uploading image to S3:', error);


	throw error;


  }


}
