{-# LANGUAGE DerivingStrategies #-}
module Gen where

newtype PageName  = PageName String  deriving stock (Show)
newtype FieldName = FieldName String deriving stock (Show)

data Page = Page PageName [Line] deriving stock (Show)

data Line = Table { tFields   :: [FieldName]
                  , tDummyRow :: Line }
          | DummyRow -- to construct table, which can take a line like Line `GoesTo` PageName
          | SpaceSplit
          | Button String
          | FormInput FieldName
          | FormLongInput FieldName
          | FormUpload FieldName
          | FormSubmit String
          | GoesTo Line PageName
          deriving stock (Show)
