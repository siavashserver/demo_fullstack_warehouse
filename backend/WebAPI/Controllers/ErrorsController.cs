using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebAPI.Controllers;

public class ErrorsController : BaseAPIController
{
    [HttpGet]
    public ActionResult ErrorHandler()
    {
        var exception = HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error;

        if (exception is ValidationException ex) return ValidationProblem(CreateModelStateDictionary(ex));

        return Problem(statusCode: (int)HttpStatusCode.InternalServerError, detail: exception?.Message);
    }

    private ModelStateDictionary CreateModelStateDictionary(ValidationException validationException)
    {
        var modelStateDictionary = new ModelStateDictionary();

        foreach (var failure in validationException.Errors)
            modelStateDictionary.AddModelError(failure.PropertyName, failure.ErrorMessage);

        return modelStateDictionary;
    }
}