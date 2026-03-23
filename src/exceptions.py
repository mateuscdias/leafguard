class LoadingError(Exception):
    
    '''Exception to handle failure to load something o a code'''
    def __init__(self, message:str):
        super().__init__(message)

class NotDiagnosisError(Exception):

    '''Exception to handle when the system can't make a diagnosis'''

    def __init__(self, message:str):
        super().__init__(message)

class NotGettingInformationError(Exception):

    '''Exception when the code cannot get information from the PROLOG'''
    def __init__(self, message):
        super().__init__(message)