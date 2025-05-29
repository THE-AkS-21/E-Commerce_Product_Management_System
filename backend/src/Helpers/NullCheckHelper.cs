namespace Helpers;
public static class NullCheckHelper
{
    public static void ThrowIfNull<T>(T? obj, string message) where T : class
    {
        if (obj == null)
            throw new ArgumentNullException(nameof(obj), message);
    }

    public static bool IsNull<T>(T? obj) where T : class
    {
        return obj == null;
    }
}