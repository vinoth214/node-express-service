/**
 * New node file
 */
module.exports.constants = {		
		RESULT_CODE: {
		    SUCCESS: 0,
		    FAILURE: 1
		  }
		  
}

function getLoginInstance(resultCode, data, license, resultMessage, token) {
	  try {
	    return {
	      "resTypeCode"   : resultCode,
	      "resTypeMessage": resultMessage,
	      "license" : license,
	      "loginData"     : data,
	      "tokenData"     : token
	    };
	  }
	  catch (exception) {
	    log.info(" Exception in  creating response ", exception);
	    return exception;
	  }
	}

	/**
	 * getLoginFailureInstance method is being called from the dao to generate the response in required format
	 * @param resultCode    - to display success or failure
	 * @param data          - to pass the response
	 * @param resultMessage - to display any message,if required
	 */
	function getLoginFailureInstance(resultCode, resultMessage) {
	  try {
	    return {
	      "resTypeCode"   : resultCode,
	      "resTypeMessage": resultMessage,
	    };
	  }
	  catch (exception) {
	    log.info(" Exception in  creating response ", exception);
	    return exception;
	  }
	}
	
module.exports.getLoginInstance         = getLoginInstance;
module.exports.getLoginFailureInstance  = getLoginFailureInstance;